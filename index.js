
document.getElementById("btn").onclick= function() {
    let basic_pay=document.getElementById("income").value;
    document.getElementById("ring").style.display="flex";
    document.getElementById("calc").style.display="none";
    document.getElementById("invalid").style.display="none";

    if(basic_pay>0){
        var millisecondsToWait = 2000;

        setTimeout(function() {
            Kenyan_tax(basic_pay);
            document.getElementById("ring").style.display="none";
            document.getElementById("calc").style.display="flex";
        }, millisecondsToWait);

    }else{
        var millisecondsToWait = 1000;

        setTimeout(function() {
            document.getElementById("ring").style.display="none";
            document.getElementById("calc").style.display="flex";
            document.getElementById("invalid").style.display="flex";
            document.getElementById("my_payslip").style.display="none";
        }, millisecondsToWait);
        
    }
    
}

function Kenyan_tax(basic_pay){
    let nssf=1080;
    let x=document.getElementById("dropdown").value;

    if(x=="Tier 1"){
        document.getElementById("nssf").innerText="Ksh 360";
        nssf=360;

    }else if(x=="Old Rates"){
        document.getElementById("nssf").innerText="Ksh 200";
        nssf=200;

    }else if(x=="None"){
        document.getElementById("nssf").innerText="Ksh 0";
        nssf=0;
    }else{
        document.getElementById("nssf").innerText="Ksh 1080";

    }

    let taxable=basic_pay-nssf;
    let tax=taxable;
    let income_tax=0;
    let i=0;
    
    let percentages=[10,25,30,32.5,35]
    let tax_bracket=[24000,8333,467667,300000,800000]

    while(true){
        if(tax<tax_bracket[i]){
            income_tax+=(percentages[i]/100)*tax;
            break;
        }
        else{
            income_tax+=(percentages[i]/100)*tax_bracket[i];
            tax-=tax_bracket[i]
            i++;
        }

    }
    
    document.getElementById("my_payslip").style.display="flex";
    document.getElementById("salary").innerText="Ksh "+basic_pay;
    document.getElementById("taxable").innerText="Ksh "+taxable;
    document.getElementById("tax_amount").innerText="Ksh "+income_tax.toFixed(2);
    document.getElementById("relief").innerText="Ksh 2400";

    let paye=income_tax-2400;
    document.getElementById("paye").innerText="Ksh "+paye.toFixed(2);

    let levy=0.015*basic_pay;
    document.getElementById("levy").innerText="Ksh "+levy.toFixed(2);

    let net_amount=taxable-(paye+levy);
    document.getElementById("net_amount").innerText="Ksh "+net_amount.toFixed(2);
}

