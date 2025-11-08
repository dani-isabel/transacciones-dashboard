export function formatCurrency(amount:number) {
    const locale = "es-ES"
    try{
        Intl.NumberFormat.supportedLocalesOf([locale])
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(amount).replace("COP", "")
    } catch(error) {
        console.error("Invalid locale", {error, amount, locale})
    }
}
    