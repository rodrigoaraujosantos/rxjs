import path from 'path'
import { Observable } from 'rxjs'
import fs from 'fs'

const filePaths: string[] = [
  path.join(__dirname, 'files', 'app_1.txt'),
  path.join(__dirname, 'files', 'app_2.txt'),
  path.join(__dirname, 'files', 'app_3.txt'),
  path.join(__dirname, 'files', 'app_4.txt'),
  path.join(__dirname, 'files', 'estilo_1.css'),
  path.join(__dirname, 'files', 'estilo_2.css'),
  path.join(__dirname, 'files', 'estilo_3.css'),
  path.join(__dirname, 'files', 'estilo_4.css'),
  path.join(__dirname, 'files', 'estrutura_1.html'),
  path.join(__dirname, 'files', 'estrutura_2.html'),
  path.join(__dirname, 'files', 'estrutura_3.html'),
  path.join(__dirname, 'files', 'estrutura_4.html')
]

const isCSS = /^((.|#){0,1}(\w+-{0,1})+\s*{(\s*(\w+-{0,1})+:\s*(\w+\s*)+;\s*)+\s*}\s*)/i
const isHTML = /^<!DOCTYPE html>/i

function lerArquivos(arquivos: string[]) {
  
  const leitor = new Observable<string>((subscriber) => {
    arquivos.forEach((arq) => {
      
      try {
        const conteudo = fs.readFileSync(arq, { encoding: 'utf-8'})
        subscriber.next(conteudo)
      } catch (error) {
        subscriber.error(`Não foi possível ler o arquivo que esta no caminho ${arq}`)
      }
      // responsavel por mandar a mensagem de sucesso
      //subscriber.error()//responsavel por mandar a mensagem de erro
      //subscriber.complete()//responsavel por mandar a mensagem de completo
      /**
       * --> Envio de Dados do Observable <--
       * 
       * 3 ESTÁGIOS
       *   -> Sucesso: O Observable conseguiu realizar seu trabalho sem nenhum problema
       *               e enviou os dados com sucesso
       *   
       *   -> Erro: O Observable teve algum problema durante a sua execução e não conseguiu
       *            realizar sua tarefa de maneira satisfatória e não conseguiu enviar os dados.
       *            Quando um Observable passa pelo estágio de erro, sua execuç
       **/

    })
    
    subscriber.complete()
  })

  return leitor
}

let obs = lerArquivos(filePaths)

// 1° Sucesso
// 2° Erro
// 3° Completo

obs.subscribe(
  (conteudoLido) => {
    console.log('-------- ARQUIVO LIDO COM SUCESSO --------')
    console.log(conteudoLido)
    console.log("------------------------------------------\n\n")
  },
  (erro) => {
    console.log('OCORREU UM ERRO NA EXECUÇÃO DO OBSERVABLE')
    console.log(erro)
  },
  () => {
    console.log('Todos os arquivos foram lidos com sucesso')
  }
)
console.log('----------------------------------------------')

obs.subscribe(
  (conteudoLido) => {
    console.log(`Este arquivo possui ${conteudoLido.length} caracteres`)
  }
)
