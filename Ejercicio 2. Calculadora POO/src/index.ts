import readline from 'readline';
import {Calculadora} from './Calculadora';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const calculadora = new Calculadora();
function question(promt: string): Promise<string>{
    return new Promise(resolve => {
        rl.question(promt, resolve);
    });
}
async function pedirNumeros(): Promise<{a: number, b: number}>{
   const inputA = await question('Ingrese el primer numero: ');
   const inputB = await question('Ingrese el segundo numero: ');
   const a = parseFloat(inputA);
   const b = parseFloat(inputB);
   if (isNaN(a) || isNaN(b)){
    console.log("Ingrese numeros validos");
    return pedirNumeros();
   }
   return {a,b};
}
async function menu(): Promise<void>{
    console.log("Calculadora POO");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir");
    const opcion = await question("Elige una opcion: ");
    await manejarOpcion(opcion);
}
async function manejarOpcion(op: string): Promise<void>{
    switch (op){
        case "1":{
            const{a,b} = await pedirNumeros();
            console.log(`Resultado: ${calculadora.sumar(a,b)}`);
            break;
        }
        case "2":{
            const{a,b} = await pedirNumeros();
            console.log(`Resultado: ${calculadora.restar(a,b)}`);
            break;
        }
        case "3":{
            const{a,b} =await pedirNumeros();
            console.log(`Resultado: ${calculadora.multiplicar(a,b)}`);
            break;
        }
        case "4":{
            const {a,b} = await pedirNumeros();
            try{
                const resultado = calculadora.dividir(a,b);
                console.log(`Resultado: ${resultado}`);
            } catch(error: any){
                console.log(`Error: ${error.message}`);
            } break;
        }
        case "5":{
            console.log("Saliendo...");
            rl.close();
            return;
        }
        default:
            console.log("Opcion invalida, intenta otra vez...");
            break;
    }
    await menu();
}
menu();