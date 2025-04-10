function popInicial(periodo1, periodo2, periodo3, periodo4, periodo5, tamPop) {
    const pop = Array.from({ length: tamPop }, () => Array(100).fill(""));
    const periodos = [periodo1, periodo2, periodo3, periodo4, periodo5];

    for (let k = 0; k < tamPop; k++) {
        let j = 0;

        for (let periodo of periodos) {
            let aux = [];

            for (let s of periodo) {
                for (let i = 0; i < 4; i++) {
                    aux.push(s);
                }
            }

            for (let i = aux.length - 1; i > 0; i--) {
                const randIndex = Math.floor(Math.random() * (i + 1));
                [aux[i], aux[randIndex]] = [aux[randIndex], aux[i]];
            }

       
            for (let s of aux) {
                pop[k][j++] = s;
            }
        }
    }

    return pop;
}

const professores = Array.from(new Set(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"]));

const todasDisciplinas = [];
for (let i = 1; i <= 25; i++) {
  const codigoDisciplina = `D${i}`;
  const professor = professores[(i - 1) % professores.length]; 
  todasDisciplinas.push(`${codigoDisciplina}-${professor}`);
}

const periodo1 = new Set(todasDisciplinas.slice(0, 5));
const periodo2 = new Set(todasDisciplinas.slice(5, 10));
const periodo3 = new Set(todasDisciplinas.slice(10, 15));
const periodo4 = new Set(todasDisciplinas.slice(15, 20));
const periodo5 = new Set(todasDisciplinas.slice(20, 25));

console.log("Período 1:", periodo1);
console.log("Período 2:", periodo2);
console.log("Período 3:", periodo3);
console.log("Período 4:", periodo4);
console.log("Período 5:", periodo5);

const tamPop = 50;
const populacao = popInicial(periodo1, periodo2, periodo3, periodo4, periodo5, tamPop);

console.log(populacao);
