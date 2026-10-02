document.addEventListener("DOMContentLoaded", () => {
    // Modal
    const modal = document.getElementById("modal");
    const abrirModal = document.getElementById("abrirModal");
    const fecharModal = document.getElementById("fecharModal");

    // Formulário e Agenda
    const form = document.getElementById("formAgendamento");
    const agenda = document.getElementById("agenda");

    // Resumo
    const totalPacientes = document.getElementById("totalPacientes");
    const totalPendentes = document.getElementById("totalPendentes");

    // Busca
    const buscaPaciente = document.getElementById("buscaPaciente");

    // ABRIR MODAL
    if (abrirModal) {
        abrirModal.addEventListener("click", () => {
            modal.classList.add("ativo");
        });
    }

    // FECHAR MODAL
    if (fecharModal) {
        fecharModal.addEventListener("click", () => {
            modal.classList.remove("ativo");
        });
    }

    // FECHAR CLICANDO FORA DO MODAL
    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("ativo");
            }
        });
    }

    // CADASTRAR NOVA CONSULTA
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const hora = document.getElementById("hora").value;
            const procedimento = document.getElementById("procedimento").value;
            const status = document.getElementById("status").value;

            // Calcula o horário final (+1 hora)
            const [horaNumero, minuto] = hora.split(":");
            const horaFinal = `${String(Number(horaNumero) + 1).padStart(2, "0")}:${minuto}`;

            // Cria o elemento da consulta
            const consulta = document.createElement("article");
            consulta.className = status === "Pendente" ? "consulta pendente" : "consulta confirmada";

            // Conteúdo da consulta (sem avatar)
            consulta.innerHTML = `
                <div class="hora-consulta">
                    ${hora}<br>
                    <small>${horaFinal}</small>
                </div>

                <div class="dados">
                    <strong>${nome}</strong>
                    <span>${procedimento}</span>
                </div>

                <span class="status ${status === "Pendente" ? "status-pendente" : ""}">
                    ${status}
                </span>

                <button class="prontuario">
                    ▣ Prontuário
                </button>
            `;

            // Adiciona na agenda
            agenda.appendChild(consulta);

            // Adiciona na lista da barra lateral
            const secaoProximos = document.querySelector(".proximos");
            const novoMini = document.createElement("div");
            novoMini.className = "paciente-mini";
            novoMini.innerHTML = `
                <div>
                    <strong>${nome}</strong>
                    <span>${hora} — ${horaFinal}</span>
                </div>
            `;
            secaoProximos.appendChild(novoMini);

            // Atualiza resumo
            atualizarResumo();

            // Limpa e fecha modal
            form.reset();
            modal.classList.remove("ativo");
        });
    }

    // ATUALIZAR RESUMO
    function atualizarResumo() {
        const consultas = document.querySelectorAll(".consulta");
        const pendentes = document.querySelectorAll(".consulta.pendente");

        if (totalPacientes) totalPacientes.textContent = consultas.length;
        if (totalPendentes) totalPendentes.textContent = pendentes.length;
    }

    // BUSCAR PACIENTE
    if (buscaPaciente) {
        buscaPaciente.addEventListener("input", () => {
            const texto = buscaPaciente.value.toLowerCase();
            const pacientes = document.querySelectorAll(".paciente-mini");

            pacientes.forEach((paciente) => {
                const nome = paciente.querySelector("strong").textContent.toLowerCase();
                if (nome.includes(texto)) {
                    paciente.style.display = "flex";
                } else {
                    paciente.style.display = "none";
                }
            });
        });
    }

    // NAVEGAÇÃO DE DATAS
    const datas = [
        "Sexta-feira, 25 de Setembro de 2026",
        "Sábado, 26 de Setembro de 2026",
        "Domingo, 27 de Setembro de 2026"
    ];

    let dataAtual = 0;

    function atualizarData() {
        const dataTexto = document.getElementById("dataTexto");
        const subtituloData = document.getElementById("subtituloData");
        const dataCompleta = document.getElementById("dataCompleta");

        if (dataTexto) dataTexto.textContent = datas[dataAtual];
        if (subtituloData) subtituloData.textContent = datas[dataAtual];

        const dia = 25 + dataAtual;
        if (dataCompleta) {
            dataCompleta.textContent = `${String(dia).padStart(2, "0")}/09/2026`;
        }
    }

    const proximoDiaBtn = document.getElementById("proximoDia");
    const diaAnteriorBtn = document.getElementById("diaAnterior");

    if (proximoDiaBtn) {
        proximoDiaBtn.addEventListener("click", () => {
            if (dataAtual < datas.length - 1) {
                dataAtual++;
                atualizarData();
            }
        });
    }

    if (diaAnteriorBtn) {
        diaAnteriorBtn.addEventListener("click", () => {
            if (dataAtual > 0) {
                dataAtual--;
                atualizarData();
            }
        });
    }
});