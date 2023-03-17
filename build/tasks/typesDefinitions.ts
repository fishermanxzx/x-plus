import process from 'process'
import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import { Project } from 'ts-morph'
import { buildOutput, xpRoot, excludeFiles, pkgRoot, projRoot } from '../utils'
import { pathRewriter } from '../utils'
import type { CompilerOptions, SourceFile } from 'ts-morph'

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.json')
const outDir = path.resolve(buildOutput, 'types')

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const typesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false,
    composite: true,
    include: ['packages', 'typings/components.d.ts', 'typings/env.d.ts'],
    exclude: [
      'node_modules',
      '**/dist',
      '**/__tests__/**/*',
      '**/gulpfile.ts',
      '**/test-helper',
      'packages/test-utils',
      '**/*.md'
    ]
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })

  const sourceFiles = await addSourceFiles(project)
  typeCheck(project)
  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async sourceFile => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${relativePath}`)
    }

    const subTasks = emitFiles.map(async outputFile => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true
      })

      await writeFile(
        filepath,
        pathRewriter('esm')(outputFile.getText()),
        'utf8'
      )
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!element-plus/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: xpRoot,
      onlyFiles: true
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content =
            (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async file => {
      const content = await readFile(path.resolve(xpRoot, file), 'utf-8')
      sourceFiles.push(
        /*
          注意：
          这里path.resolve(pkgRoot, file)的结果是 绝对路径/packages/components.ts
          导致 /packages/x-plus/components.ts 读取 '@x-plus/components' 时
          解析为 'packages/components' 会读取到自己而不是packages/components/index.ts
          导致找不到导出的组件而报错
          所以packages/x-plus/文件名  文件名的名字和 packages/文件夹名  文件名的文字不能一样
          这也是element-plus源码里 packages/element-plus/component 不是components的原因
          同理locales 和 locale 一样
        */
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      )
    })
  ])

  return sourceFiles
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    throw err
  }
}
