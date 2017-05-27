
const initialXptos = [
    [true, '12312312312312312312', '5543999991111', 'V', 'Enabled'],
    [false, '32132132132132132132', '5543999991112', 'C', 'Enabled'],
    [false, '66699966666699966699', '5543999991113', 'T', 'Disabled']
]

function getInitial(callback) {
    callback(initialXptos)
}

function execute(payload) {
    console.log('Executing', payload)
}

const XptoService = { 
    getInitial, execute 
}
export default XptoService