class PagesController < ApplicationController
    protect_from_forgery except: [:donation]
    before_action :authenticate_user!, only: [:create]

    def donation
        if user_signed_in?
            @total_amount = 0
            @payments = current_user.payments.order('created_at DESC').paginate(per_page: 5, page: params[:page])
            @payments.each do |payment|
                @total_amount += payment.amount
            end
            @payment = Payment.new()
        end
    end

    def create
        @payment = current_user.payments.create(payment_params)
        
        if @payment
            value = {
                business: "jason.kim.seller@gmail.com",
                cmd: "_xclick",
                upload: 1,
                notify_url: "http://06bd9b67.ngrok.io/notify",
                amount: @payment.amount,
                mc_currency: "AUD",
                item_name: "Donation from #{@payment.user.user_name}",
                item_number: @payment.id,
                quantity: "1",
                return: "http://06bd9b67.ngrok.io"
            }
            redirect_to "https://www.sandbox.paypal.com/cgi-bin/webscr?" + value.to_query
        else
            redirect_to pages_donation_path, alert: "Something wrong with payment. Try again."
        end
    end

    protect_from_forgery except: [:notify]
    def notify
        params.permit!
        status = params[:payment_status]
        @payment = Payment.find(params[:item_number])
        if status == "Completed"
            if @payment.paid == false
                PaymentMailer.with(payment: @payment).payment_succeed_email.deliver_later
                @payment.update_attributes paid: true
            end
        else
            @payment.destroy
        end
        render nothing: true
    end

    private
        def payment_params
            params.require(:payment).permit(:amount, :comment, :user_id)
        end
end
