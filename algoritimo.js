// Define professores
const professores = Array.from({ length: 10 }, (_, i) => `P${i + 1}`);

// Disciplinas organizadas por período
const disciplinasPorPeriodo = [
	['HTML', 'Logica', 'Empreende', 'Fundamentos', 'UX/UI'],
	['POO', 'SQL', 'DB', 'Logica Avancada', 'Sistemas Operacionais'],
	['POO2', 'SQL Avancado', 'React', 'Algoritmos', 'Segurança da Informação'],
	['Microservicos', 'React Native', 'NoSQL', 'ORM', 'Docker'],
	['Projetos', 'GO', 'IA', 'Libras', 'DevOps']
];

// Associa professores aleatórios às disciplinas
function associarProfessores(disciplinasPorPeriodo) {
	return disciplinasPorPeriodo.map(periodo =>
		periodo.map(disciplina => {
			const professorAleatorio = professores[Math.floor(Math.random() * professores.length)];
			return `${disciplina}-${professorAleatorio}`;
		})
	);
}

const [periodo1, periodo2, periodo3, periodo4, periodo5] = associarProfessores(disciplinasPorPeriodo).map(periodo => new Set(periodo));

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

const tamPop = 50;
const populacao = popInicial(periodo1, periodo2, periodo3, periodo4, periodo5, tamPop);

function percorrerPopulacao(populacao) {
	let aux = [];

	for (let i = 0; i < populacao.length; i++) {
		let count = 0;

		for (let j = 0; j < 20; j++) {
			const professores = [
				populacao[i][j].split("-")[1],
				populacao[i][j + 20].split("-")[1],
				populacao[i][j + 40].split("-")[1],
				populacao[i][j + 60].split("-")[1],
				populacao[i][j + 80].split("-")[1]
			];

			for (let x = 0; x < professores.length - 1; x++) {
				for (let y = x + 1; y < professores.length; y++) {
					if (professores[x] === professores[y]) {
						count++;
					}
				}
			}
		}

		aux.push(count);
	}

	return aux;
}

const avaliacao = percorrerPopulacao(populacao);

console.log("VETOR DAS AVALIAÇÕES");
console.log(avaliacao.sort());

function ordenacao(populacao, avaliacoes) {
	const combinados = populacao.map((individuo, index) => ({
		individuo,
		avaliacao: avaliacoes[index]
	}));

	combinados.sort((a, b) => a.avaliacao - b.avaliacao);

	for (const { individuo, avaliacao } of combinados) {
		console.log("Avaliação:", avaliacao, "Indivíduo:", individuo);
	}

	return combinados.map(item => item.individuo);
}

const populacaoOrdenada = ordenacao(populacao, avaliacao);

function renderPopulacaoPorPeriodo(populacaoOrdenada, avaliacoes) {
	const containerGeral = document.createElement("div");
	containerGeral.className = "populacao";

	const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
	const horariosPorDia = 4;
	const totalPeriodos = 5;

	populacaoOrdenada.forEach((individuo, index) => {
		const container = document.createElement("div");
		container.className = "individuo";

		const title = document.createElement("h2");
		title.textContent = `Indivíduo ${index + 1} | Conflitos: ${avaliacoes[index]}`;
		container.appendChild(title);

		for (let p = 0; p < totalPeriodos; p++) {
			const periodoLabel = document.createElement("h3");
			periodoLabel.textContent = `Período ${p + 1}`;
			container.appendChild(periodoLabel);

			const table = document.createElement("table");
			const header = document.createElement("tr");
			header.innerHTML = `<th>Horário</th>${dias.map(d => `<th>${d}</th>`).join('')}`;
			table.appendChild(header);

			for (let h = 0; h < horariosPorDia; h++) {
				const row = document.createElement("tr");
				row.innerHTML = `<td>${h + 1}</td>`;

				for (let d = 0; d < dias.length; d++) {
					const indexCelula = p * 20 + d * horariosPorDia + h;
					const cell = document.createElement("td");
					cell.textContent = individuo[indexCelula];
					row.appendChild(cell);
				}
				table.appendChild(row);
			}

			container.appendChild(table);
		}

		containerGeral.appendChild(container);
	});

	document.getElementById("horarios").appendChild(containerGeral);
}

renderPopulacaoPorPeriodo(populacaoOrdenada, avaliacao);
