const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const api = express();
api.use(express.json());

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const Order = db.define('Order', {
    orderId: { type: DataTypes.STRING, primaryKey: true },
    value: DataTypes.FLOAT,
    creationDate: DataTypes.DATE
}, { timestamps: false });

const Item = db.define('Item', {
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
}, { timestamps: false });

Order.hasMany(Item, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

db.sync();

api.post('/order', async (req, res) => {
    try {
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

        const pedidoFormatado = {
            orderId: numeroPedido.split('-')[0],
            value: valorTotal,
            creationDate: new Date(dataCriacao),
            items: items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };

        const novoPedido = await Order.create(pedidoFormatado, {
            include: [{ model: Item, as: 'items' }]
        });

        return res.status(201).json(novoPedido);
    } catch (erro) {
        if (erro.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ mensagem: 'Pedido duplicado' });
        }
        return res.status(400).json({ mensagem: 'Erro ao processar pedido', detalhe: erro.message });
    }
});

api.get('/order/:id', async (req, res) => {
    try {
        const pedido = await Order.findByPk(req.params.id, {
            include: [{ model: Item, as: 'items' }]
        });

        if (!pedido) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        }
        
        return res.json(pedido);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno' });
    }
});

api.get('/order/list', async (req, res) => {
    const listagem = await Order.findAll({ 
        include: [{ model: Item, as: 'items' }] 
    });
    return res.json(listagem);
});

api.put('/order/:id', async (req, res) => {
    try {
        const pedido = await Order.findByPk(req.params.id);
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido inexistente' });
        
        await pedido.update(req.body);
        return res.json(pedido);
    } catch (erro) {
        return res.status(400).json({ error: erro.message });
    }
});

api.delete('/order/:id', async (req, res) => {
    try {
        const removido = await Order.destroy({ where: { orderId: req.params.id } });
        if (!removido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        
        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao excluir' });
    }
});

api.listen(3000, () => {
    console.log('API Online - Porta 3000');
});