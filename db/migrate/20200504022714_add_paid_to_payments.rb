class AddPaidToPayments < ActiveRecord::Migration[6.0]
  def change
    add_column :payments, :paid, :boolean, default: false
  end
end
