import { CONTACTS } from "@/constants/contacts";
import { Phone, Mail } from "lucide-react";


const ContactInfo = () => {
    return(
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Контакты</h3>
                <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{CONTACTS.PHONE_NUMBER}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{CONTACTS.EMAIL_ADDRESS}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{CONTACTS.TELEGRAM}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{CONTACTS.WHATSAPP}</span>
                </div>
                </div>
            </div>
    );
}

export { ContactInfo };