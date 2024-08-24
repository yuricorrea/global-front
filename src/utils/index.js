const formatCurrency = (value) => {
    if (isNaN(value)) return value;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const ONE_DAY = (1000 * 60 * 60 * 24);

export { formatCurrency, ONE_DAY };