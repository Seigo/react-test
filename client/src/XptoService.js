
const initialXptos = [
    {checked: true, id: '12312312312312312312', number: '5543999991111', model: 'V', status: 'Enabled'},
    {checked: false, id: '32132132132132132132', number: '5543999991112', model: 'C', status: 'Enabled'},
    {checked: false, id: '66699966666699966699', number: '5543999991113', model: 'T', status: 'Disabled'}
]

const xptosFound = [
    {id: '12312312312312312312', number: '5543999991111', model: 'V', status: 'Disabled'},
    {id: '32132132132132132132', number: '5543999991112', model: 'C', status: 'Disabled'}
]

function getInitial(callback) {
    callback(initialXptos)
}

function execute(payload, callback) {
    console.log('Executing', JSON.stringify(payload))

    var myRequest = new Request('http://localhost:3000/xpto');
    fetch(myRequest)
        .then(function(response) {
            console.log(response)
        });

    callback && callback(xptosFound)
}

const XptoService = { 
    getInitial, execute 
}
export default XptoService