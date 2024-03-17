'use client';

import { useState } from 'react';

const Home = () => {
  const [plaintext, setPlaintext] = useState<string>('');
  const [ciphertext, setCiphertext] = useState<string>('');
  const [shift, setShift] = useState<number>(3);

  const cifrar = (text: string, deslocamento: number, min: number = 12, max: number = 255): string => {
    let MAX_DESLOCAMENTO = ((max + 1) - min);
    if (text === '') {
      throw 'Digite algum(a) texto/palavra para ser cifrado(a).';
    }
    if (deslocamento < 0 || deslocamento > MAX_DESLOCAMENTO) {
      throw 'O deslocamento não pode ser menor que 0 e não pode ser maior que ' + MAX_DESLOCAMENTO + '.';
    }
    let textCifrado = '';
    for (let i = 0; i < text.length; i++) {
      if ((text.charCodeAt(i) - deslocamento) < min) {
        textCifrado += String.fromCharCode((max + 1) - (min - (text.charCodeAt(i) - deslocamento)));
      } else {
        textCifrado += String.fromCharCode(text.charCodeAt(i) - deslocamento);
      }
    }
    return textCifrado;
  };

  const decifrar = (text: string, deslocamento: number, min: number = 12, max: number = 255): string => {
    let MAX_DESLOCAMENTO = ((max + 1) - min);
    if (text === '') {
      throw 'Digite algum(a) texto/palavra para ser decifrado(a).';
    }
    if (deslocamento < 0 || deslocamento > MAX_DESLOCAMENTO) {
      throw 'O deslocamento não pode ser menor que 0 e não pode ser maior que ' + MAX_DESLOCAMENTO;
    }
    let textDecifrado = '';
    for (let i = 0; i < text.length; i++) {
      if ((text.charCodeAt(i) + deslocamento) > max) {
        textDecifrado += String.fromCharCode((text.charCodeAt(i) + deslocamento) - MAX_DESLOCAMENTO);
      } else {
        textDecifrado += String.fromCharCode(text.charCodeAt(i) + deslocamento);
      }
    }
    return textDecifrado;
  };

  const handleEncrypt = () => {
    try {
      const encryptedText = cifrar(plaintext, shift);
      setCiphertext(encryptedText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrypt = () => {
    try {
      const decryptedText = decifrar(ciphertext, shift);
      setPlaintext(decryptedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cifra de César</h1>
      <div className="flex flex-col space-y-2">
        <textarea
          className="border p-2 text-black"
          placeholder="Insira sua mensagem aqui..."
          value={plaintext}
          onChange={e => setPlaintext(e.target.value)}
        />
        <div className="flex space-x-2">
          <input
            type="number"
            className="border p-2 w-16 text-black	"
            value={shift}
            onChange={e => setShift(parseInt(e.target.value))}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEncrypt}>Cifrar</button>
        </div>
        <textarea
          className="border p-2 text-black"
          placeholder="Mensagem cifrada..."
          value={ciphertext}
          readOnly
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleDecrypt}>Decifrar</button>
      </div>
    </div>
  );
}

export default Home;
