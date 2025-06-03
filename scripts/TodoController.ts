import * as SQLite from 'expo-sqlite';
import React from 'react';

const db = SQLite.openDatabase('mytodo.db');

// Create the table if it doesn't exist (call once when app starts)
export function initDB() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT);'
    );
  });
}

export function addTodo(title: string, body: string) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO todos (title, body) VALUES (?, ?);',
      [title, body],
      (_, result) => {
        console.log('Insert success', result);
      },
      (_, error) => {
        console.log('Insert error', error);
        return false;
      }
    );
  });
}

export function getTodos(setTodos: React.Dispatch<React.SetStateAction<Entry[]>>) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM todos;',
      [],
      (_, { rows }) => {
        setTodos(rows._array);
      },
      (_, error) => {
        console.log('Select error', error);
        return false;
      }
    );
  });
}
