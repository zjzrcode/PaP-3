"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const Calculadora_1 = require("./Calculadora");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const calculadora = new Calculadora_1.Calculadora();
function menu() {
    console.log("Calculadora en POO");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir");
    rl.question("Elige una opción: ", opcion);
}
function pedirNumeros(pedir) {
    rl.question('Ingrese el primer numero: ', (inputA) => {
        rl.question('Ingrese el segundo numero: ', (inputB) => {
            const a = parseFloat(inputA);
            const b = parseFloat(inputB);
            if (isNaN(a) || isNaN(b)) {
                console.log("Ingrese un numero valido...");
                menu();
            }
            else {
                pedir(a, b);
            }
        });
    });
}
function opcion(opcion) {
    switch (opcion) {
        case "1":
            pedirNumeros((a, b) => {
                console.log(`Resultado: ${calculadora.sumar(a, b)}`);
                menu();
            });
            break;
        case "2":
            pedirNumeros((a, b) => {
                console.log(`Resultado: ${calculadora.restar(a, b)}`);
            });
            break;
        case "3":
            pedirNumeros((a, b) => {
                console.log(`Resultado: ${calculadora.multiplicar(a, b)}`);
            });
            break;
        case "4":
            pedirNumeros((a, b) => {
                console.log(`Resultado: ${calculadora.dividir(a, b)}`);
            });
            break;
        case "5":
            console.log("Saliendo...");
            rl.close();
            break;
        default:
            console.log("Opcion invalida, intentente otra vez ");
            menu();
            break;
    }
}
menu();
