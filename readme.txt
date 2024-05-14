создание бэкэнда:
step1: yarn init --yes, // создание проекта
step2: yarn add express dotenv, // добавление express и библиотеки для работы с переменными окружения
step3: yarn add nodemon typescript ts-node @types/node @types/express jest ts-jest @types/jest supertest @types/supertest --dev, // добавление библиотек дебагинга, тайпскрипта, тестов
step4: yarn tsc --init, // включение тайпскрипта
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "outDir": "./dist",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitReturns": true,
        "skipLibCheck": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.test.ts"]
}
скрипты:

watch - создание джаваскрипт бэкэнда на основе тайпскрипт кода
dev - запуск джаваскрипт бэкэнда
jest - запуск тестов (для запуска тестов НЕ нужно запускать бэкэнд)
  "scripts": {
        "watch": "tsc -w",
        "dev": "yarn nodemon --inspect dist/index.js",
        "jest": "jest -i"
    },
настройка тестов
yarn ts-jest config:init
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "__tests__/.*.e2e.test.ts$",
}
вспомогательную/повторяющуюся логику можно складывать в отдельные файлы: __test__/test-helpers.ts
import {app} from '../src/app'
import {agent} from 'supertest'
 
export const req = agent(app)

 В случае, когда число файлов с тестами становится больше одного, как на картинке ниже, возникает ряд проблем.

Одна из которых - одновременный запуск всех тестовых файлов. Чтобы избежать этой проблемы в файл package.json в scripts нужно подправить команду запуска jest

"scripts": {
    "jest": "jest -i" //OR "jest": "jest --runInBand"
},

Чтобы тесты запускались последовательно (файл за файлом) в scripts прописываем  флаги "-i" или “--runInBand”

serveo ssh -R 80:localhost:3003 serveo.net