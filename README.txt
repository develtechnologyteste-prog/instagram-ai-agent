INSTAGRAM AI AGENT — PROTÓTIPO PWA v0.1

REQUISITOS
- Windows para editar os arquivos.
- iPhone X com Safari.
- Para instalar como web app e usar cache offline, publique os arquivos em uma hospedagem estática HTTPS.
- Não precisa de backend, banco de dados remoto ou servidor próprio.

COMO TESTAR NO WINDOWS
1. Extraia a pasta.
2. Abra index.html no navegador para testar as funções principais.
3. Para testar o modo PWA/service worker, publique em HTTPS; abrir o arquivo diretamente não ativa o service worker.

COMO COLOCAR NO IPHONE
1. Publique o conteúdo desta pasta em uma hospedagem estática HTTPS.
2. Abra o endereço no Safari do iPhone.
3. Toque em Compartilhar > Adicionar à Tela de Início.
4. Abra pelo novo ícone.
5. Depois do primeiro carregamento, os arquivos principais ficam em cache para uso offline.

O QUE ESTA VERSÃO FAZ
- Painel local.
- Gerador de rascunhos por modelos e regras locais (não é LLM).
- Planejamento de conteúdo.
- Memória de preferências em localStorage.
- Histórico de ideias.
- Compartilhamento de texto pelo menu do iPhone.
- Exportação e limpeza dos dados locais.

O QUE AINDA NÃO FAZ
- Não conecta à conta Instagram.
- Não publica automaticamente.
- Não lê DMs ou comentários.
- Não usa um modelo generativo avançado offline.
- Não executa tarefas continuamente em segundo plano.

SEGURANÇA
- Nunca coloque senha do Instagram, App Secret ou tokens privados em app.js, HTML, arquivos públicos ou repositórios.
- A API oficial do Instagram exige conta profissional e permissões apropriadas.
- Publicação pela API requer que a mídia esteja acessível publicamente. Uma integração sem backend exige uma arquitetura de autenticação e hospedagem de mídia cuidadosamente planejada.

DADOS
As ideias e preferências ficam no armazenamento local do navegador do iPhone. Limpar os dados do Safari ou remover os dados do site pode apagar a memória. Use Exportar meus dados para criar um backup.
