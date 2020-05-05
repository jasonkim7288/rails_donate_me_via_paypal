class PaymentMailer < ApplicationMailer
    def payment_succeed_email
        @payment = params[:payment]

        mail(to: @payment.user.email, subject: "Hey #{@payment.user.user_name}, thanks for your donation!")
    end
end
