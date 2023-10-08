export function profitOrLossForOneTrade(trade) {
    let amt = (trade?.exitPrice - trade?.entryPrice) * trade?.quantity;
    if (trade?.action === "sell") {
        amt = amt * (-1)
    }
    return amt;
}

export function riskRewardForOneTrade(item) {

    

    let val1 = item?.targetPoint - item?.entryPrice
    let val2 = item?.entryPrice - item?.stopLoss

     //if null or not having any value return default value 0.00
     if (!(val1 && val2)) {
        return 0
    }
    if(val2 === 0){
        val2 = 1
    }

    let riskAndReward = parseFloat(val1 / val2).toFixed(2);

    if (val2 === 0) {
        riskAndReward = 0
    }
    if (item?.stopLoss === item?.entryPrice) {
        riskAndReward = item?.targetPoint - item?.entryPrice
    }

    return parseFloat(riskAndReward).toFixed(2);
}
//////Trade List profit / loss////
export function profitLossForTradeList(list) {
    let sum = 0;
    list.map((item) => {
        sum = sum + profitOrLossForOneTrade(item)
    })

    return sum
}


////broker screen////////


export function totalAccBal(list) {

    // total profit / loss on all trades of each broker  + total deposit
    let sum = 0;

    list.map((item) => {
        sum = sum + profitLossForTradeList(item?.trades)
    })

    return parseFloat(sum + totalDepositAmt(list))
}

export function getTotalProfitLossPercentageForAllBroker(list) {

    if(list?.length ===0){
        return 0
    }

    // total profit / loss on all trades of each broker  + total deposit
    let sum = 0;

    list.map((item) => {
        sum = sum + profitLossForTradeList(item?.trades)
    })

    return sum / list?.length;
}

export function totalDepositAmt(list) {
    // Calculate the sum of all broker deposit amounts by mapping all brokers list and each broker having their trades
    // iterate each trade to get profit/loss then add with total deposit with total profit/loss on trade
    const totalDepositAmount = list?.reduce((total, obj) => {
        return total + obj?.broker?.amtDeposit;
    }, 0);

    return parseFloat(totalDepositAmount);
}


export function getAccForOneBroker(broker) {
    return profitLossForTradeList(broker?.trades) + broker?.broker?.amtDeposit
}

export function getProfitOrLossPercentageForOneBroker(totalDeposit, totalAccumulated) {
    // Ensure that both totalDeposit and totalAccumulated are valid numbers
    if (typeof totalDeposit !== 'number' || typeof totalAccumulated !== 'number') {
        throw new Error('Both totalDeposit and totalAccumulated must be numbers');
    }

    let changeAmount = totalAccumulated - totalDeposit;;

    const percentage = (changeAmount / totalDeposit) * 100;

    return parseFloat(percentage).toFixed(2);
}





///OverView /////

export function getPAndLForAllTrade(list){
    let noOfnetPAndL = 0;
    let noOfavgProfit = 0;
    let noOfavgLoss = 0;

    let sumOfnetPAndL = 0;
    let sumOfavgProfit = 0;
    let sumOfavgLoss = 0;

    const totalTrade = list?.length;

    list?.map((item)=>{

        const pAndLForOneTrade = profitOrLossForOneTrade(item?.trade)
        sumOfnetPAndL += pAndLForOneTrade

        if(pAndLForOneTrade >= 0){
            noOfavgProfit +=1
            sumOfavgProfit += pAndLForOneTrade
        }else{
            noOfavgLoss +=1
            sumOfavgLoss += pAndLForOneTrade
        }

    })

    const resSumOfAvgLoss = (sumOfavgLoss / (noOfavgLoss ===0 ? 1 : noOfavgLoss))
    const resSumOfAvgProfit = (sumOfavgProfit / (noOfavgProfit === 0 ? 1 : noOfavgProfit))

    return {
        "sumOfnetPAndL": parseFloat(sumOfnetPAndL).toFixed(2),
        "sumOfavgProfit": parseFloat(resSumOfAvgProfit).toFixed(2),
        "sumOfavgLoss":parseFloat(resSumOfAvgLoss).toFixed(2),
        "winLoss":noOfavgProfit+"/"+noOfavgLoss
    }

}

export function gerRiskRewardForAllTrade(list){

    if(list?.length === 0){
        return 0
    }

    let sum = 0;
    list?.map((item)=>{
        sum+=parseFloat(riskRewardForOneTrade(item?.trade))
    })

    return parseFloat(sum / list?.length).toFixed(2);
}