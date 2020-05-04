class PagesController < ApplicationController
    def index
    end

    def donation
        @payment = Payment.new()
    end

    def create
        @payment = Payment.create(payment_params)
        if @payment
            value = {
                business: "jason.kim.seller@gmail.com",
                cmd: "_xclick",
                upload: 1,
                notify_url: "http://7ebf2177.ngrok.io/notify",
                amount: @payment.amount,
                item_name: "Donation from #{@payment.user.user_name}",
                item_number: @payment.id,
                quantity: "1",
                return: "http://7ebf2177.ngrok.io/pages/donation"
            }
            redirect_to "http://www.sendbox.paypal.com/cgi-bin/webscr?" + value.to_query
        else
            redirect_to pages_donation_path, alert: "Something wrong with payment. Try again."
        end
    end

    def notify
        params.permit!
        status = params[:payment_status]
        payment = Payment.find(params[:item_number])
        if status == "Completed"
        render nothing: true
    end

    def success
    end

    private
        def payment_params
            params.require(:payment).permit(:amount, :comment, :user_id)
        end
end
