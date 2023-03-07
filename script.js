const box = document.querySelector('.info');
const tabela = document.createElement('table');
const box_map = document.createElement('div');
const numero_cep = document.querySelector('#cep');
const btn = document.querySelector('#btn');
tabela.classList.add('tabela');



btn.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(numero_cep.value == ""){
        alert('Informe um cep!')
    }else{
        buscaCep(numero_cep.value);
        numero_cep.value = "";
        box.removeChild(tabela);
    }
});


async function buscaCep(cep) {
    try {
        const api = await fetch("https://viacep.com.br/ws/" + cep + "/json");
        const resposta = await api.json();
        if (resposta.erro == true) {
            alert('Cep não encontrado.');
        }else{
            tabela.innerHTML = `
                <h2>Informações</h2>
                <th>Cep</th><th>Logradouro</th><th>Bairro</th>
                <th>Localidade</th><th>UF</th><th>DDD</th>
                <tr>
                    <td>${resposta.cep}</td><td>${resposta.logradouro}</td>
                    <td>${resposta.bairro}</td><td>${resposta.localidade}</td>
                    <td>${resposta.uf}</td><td>${resposta.ddd}</td>
                </tr>
                `
            box.appendChild(tabela);
            box_map.innerHTML = `<div class="maprouter"><div class="gmap_canvas"><iframe class="map" width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${resposta.logradouro}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://embedgooglemap.net/124/"></a><br><style>.maprouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>`;
            box.appendChild(box_map);
        }
    } catch (error) {
        alert('Cep inválido. Verifique o número e tente novamente.');
    }
}

