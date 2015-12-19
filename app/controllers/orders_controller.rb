class OrdersController < ApplicationController
   protect_from_forgery except: :create # need to check that out on stack
   before_action :set_order, only: :show
  def new
  end

  def create
    @order = Order.create(email: params[:stripeEmail], amount: 20, state: "pending")
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
  def show
    @order
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end


end


