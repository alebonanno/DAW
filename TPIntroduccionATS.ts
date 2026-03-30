
// 1. Interfaz Animal con atributo nombre y método gritar

interface Animal {
  nombre: string;
  gritar(): string;
}


// 2. Clases que implementan la interfaz Animal

class Perro implements Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  gritar(): string {
    return "¡Guauu!";
  }
}

class Gato implements Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  gritar(): string {
    return "¡Miaauuu!";
  }
}

class Vaca implements Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  gritar(): string {
    return "¡Muuu...!";
  }
}


// 3. Función describirAnimal
function describirAnimal(animal: Animal): void {
  console.log(`El animal ${animal.nombre} hace ${animal.gritar()}`);
}

// 4. Constantes perro, gato y vaca
const perro: Perro = new Perro("Boby");
const gato: Gato = new Gato("Garfield");
const vaca: Vaca = new Vaca("Lola");


// 5. Ejecutar describirAnimal
describirAnimal(perro);
describirAnimal(gato);
describirAnimal(vaca);


// 6. Enum DiasSemana
enum DiasSemana {
  Lunes = "Lunes",
  Martes = "Martes",
  Miércoles = "Miércoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sábado = "Sábado",
  Domingo = "Domingo"
}

// 7. Variable con número o string
let jugador: number | string;
jugador = "Messi";
console.log(`Jugador: ${jugador}`);
jugador = 10;
console.log(`Jugador: ${jugador}`);

// 8. Interfaz Fila y clase genérica
interface Fila<T> {
  agregar(elemento: T): void;
  remover(): T | undefined;
}

class FilaGenerica<T> implements Fila<T> {
  private elementos: T[] = [];

  agregar(elemento: T): void {
    this.elementos.push(elemento);
  }

  remover(): T | undefined {
    return this.elementos.shift();
    //El método remover usa shift(), que saca el primer elemento del arreglo.
    //Por eso el orden de entrada importa: lo primero que se agrega es lo primero que se quita.
  }
}

// 9. Filas para números, strings y animales
const filaNumeros: FilaGenerica<number> = new FilaGenerica<number>();
const filaStrings: FilaGenerica<string> = new FilaGenerica<string>();
const filaAnimales: FilaGenerica<Animal> = new FilaGenerica<Animal>();

// 10. Agregar elementos y remover
filaAnimales.agregar(perro);
filaAnimales.agregar(gato);
filaAnimales.agregar(vaca);

filaNumeros.agregar(1);
filaNumeros.agregar(2);
filaNumeros.agregar(3);

filaStrings.agregar("Juan");
filaStrings.agregar("Pedro");
filaStrings.agregar("Pablo");

console.log("Removido de filaAnimales:", filaAnimales.remover()?.nombre);
//El operador ?. (optional chaining) se usa porque remover() puede devolver undefined si la fila está vacía. Así evitamos errores al intentar acceder a .nombre.
console.log("Removido de filaNumeros:", filaNumeros.remover());
console.log("Removido de filaStrings:", filaStrings.remover());