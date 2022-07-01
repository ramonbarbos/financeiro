import * as SQLite from 'expo-sqlite';

// Conexão com o Banco de Dados do Sqlite 
export const Criar = {
  getConnection: () => SQLite.openDatabase("criar.db"),
};

//AVISO! Se quiser modificar o banco de dados, mude o nome e atualize o app no celular