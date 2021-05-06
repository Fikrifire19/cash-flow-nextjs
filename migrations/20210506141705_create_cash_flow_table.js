
exports.up = function(knex) {
  return knex.schema.createTable('cash_flow', function(table) {
      table.increments();
      table.date('tanggal-transaksi');
      table.integer('kode-transaksi');
      table.string('item-transaksi');
      table.string('struk-transaksi');
      table.integer('credit');
      table.integer('debit');
      table.integer('saldo');
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cash_flow');
};
