class ProductsController < ApplicationController

  def new
    @product = Product.new
  end

  def create
    @product = Product.create(product_params)
    @order = Order.create(email: params[:stripeEmail], amount: 20, state: "pending", product_id: @product.id)
    @amount = @order.amount_cents

    customer = Stripe::Customer.create(
      source: params[:stripeToken],
      email: params[:stripeEmail]
    )
    # You should store this customer id and re-use it.

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount:       @amount,  # in cents
      description:  "Paiement pour bracelet maraboute, Numéro de commande : #{@order.id}",
      currency:     'eur'
    )

    @order.update(payment: charge.to_json, state: 'paid')

    redirect_to order_path(@order)


  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_order_payment_path(@order)

  end


  private

  def product_params
    params.require(:product).permit(
      :color,
      :material
    )
  end

end
