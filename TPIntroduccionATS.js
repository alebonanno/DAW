// 1. Interfaz Animal con atributo nombre y método gritar
var _a;
// 2. Clases que implementan la interfaz Animal
var Perro = /** @class */ (function () {
    function Perro(nombre) {
        this.nombre = nombre;
    }
    Perro.prototype.gritar = function () {
        return "¡Guauu!";
    };
    return Perro;
}());
var Gato = /** @class */ (function () {
    function Gato(nombre) {
        this.nombre = nombre;
    }
    Gato.prototype.gritar = function () {
        return "¡Miaauuu!";
    };
    return Gato;
}());
var Vaca = /** @class */ (function () {
    function Vaca(nombre) {
        this.nombre = nombre;
    }
    Vaca.prototype.gritar = function () {
        return "¡Muuu...!";
    };
    return Vaca;
}());
// 3. Función describirAnimal
function describirAnimal(animal) {
    console.log("El animal ".concat(animal.nombre, " hace ").concat(animal.gritar()));
}
// 4. Constantes perro, gato y vaca
var perro = new Perro("Boby");
var gato = new Gato("Garfield");
var vaca = new Vaca("Lola");
// 5. Ejecutar describirAnimal
describirAnimal(perro);
describirAnimal(gato);
describirAnimal(vaca);
// 6. Enum DiasSemana
var DiasSemana;
(function (DiasSemana) {
    DiasSemana["Lunes"] = "Lunes";
    DiasSemana["Martes"] = "Martes";
    DiasSemana["Mi\u00E9rcoles"] = "Mi\u00E9rcoles";
    DiasSemana["Jueves"] = "Jueves";
    DiasSemana["Viernes"] = "Viernes";
    DiasSemana["S\u00E1bado"] = "S\u00E1bado";
    DiasSemana["Domingo"] = "Domingo";
})(DiasSemana || (DiasSemana = {}));
// 7. Variable con número o string
var jugador;
jugador = "Messi";
console.log("Jugador: ".concat(jugador));
jugador = 10;
console.log("Jugador: ".concat(jugador));
var FilaGenerica = /** @class */ (function () {
    function FilaGenerica() {
        this.elementos = [];
    }
    FilaGenerica.prototype.agregar = function (elemento) {
        this.elementos.push(elemento);
    };
    FilaGenerica.prototype.remover = function () {
        return this.elementos.shift();
        //El método remover usa shift(), que saca el primer elemento del arreglo.
        //Por eso el orden de entrada importa: lo primero que se agrega es lo primero que se quita.
    };
    return FilaGenerica;
}());
// 9. Filas para números, strings y animales
var filaNumeros = new FilaGenerica();
var filaStrings = new FilaGenerica();
var filaAnimales = new FilaGenerica();
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
console.log("Removido de filaAnimales:", (_a = filaAnimales.remover()) === null || _a === void 0 ? void 0 : _a.nombre);
//El operador ?. (optional chaining) se usa porque remover() puede devolver undefined si la fila está vacía. Así evitamos errores al intentar acceder a .nombre.
console.log("Removido de filaNumeros:", filaNumeros.remover());
console.log("Removido de filaStrings:", filaStrings.remover());
