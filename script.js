const box = document.querySelector('.info');
const numero_cep = document.querySelector('#cep');
const btn = document.querySelector('#btn');


btn.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(numero_cep.value == ""){
        alert('Informe um cep!')
    }else{
        buscaCep(numero_cep.value);
        numero_cep.value = "";
    }
});


async function buscaCep(cep) {
    try {
        const api = await fetch("https://viacep.com.br/ws/" + cep + "/json");
        const resposta = await api.json();
        if (resposta.erro == true) {
            alert('Cep não encontrado.');
        }else{
            box.innerHTML = `
                <h2>Informações</h2>
                <table class="tabela">
                    <tr></tr>
                    <tr><th>Cep</th><td>${resposta.cep}</td></tr>
                    <tr><th>Logradouro</th><td>${resposta.logradouro}</td></tr>
                    <tr><th>Bairro</th><td>${resposta.bairro}</td></tr>
                    <tr><th>Localidade</th><td>${resposta.localidade}</tr>
                    <tr><th>UF</th><td>${resposta.uf}</td></tr>
                    <tr><th>DDD</th><td>${resposta.ddd}</td></tr>
                </table>

                <div class="maprouter"><div class="gmap_canvas"><iframe class="map" width="" height="" id="gmap_canvas" src="https://maps.google.com/maps?q=${resposta.logradouro}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://embedgooglemap.net/124/"></a><br><style>.maprouter{position:relative;text-align:right;height:;width:;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>
                `
        }
    } catch (error) {
        alert('Cep inválido. Verifique o número e tente novamente.');
    }
}

