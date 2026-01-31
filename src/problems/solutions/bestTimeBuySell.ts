// Best Time to Buy and Sell Stock - Step by step visualization
export function* bestTimeBuySell(
  prices: number[]
): Generator<Record<string, unknown>, number, unknown> {
  const array = [...prices];
  let minPrice = Infinity;
  let maxProfit = 0;
  let buyDay = -1;
  let sellDay = -1;
  let currentBuyDay = -1;
  
  yield {
    array: [...array],
    buyDay: -1,
    sellDay: -1,
    currentBuyDay: -1,
    currentDay: -1,
    minPrice: Infinity,
    maxProfit: 0,
    message: 'Starting Best Time to Buy and Sell Stock algorithm...',
  };
  
  for (let i = 0; i < array.length; i++) {
    const profit = array[i] - minPrice;
    
    yield {
      array: [...array],
      buyDay: currentBuyDay,
      sellDay: i,
      currentBuyDay: currentBuyDay,
      currentDay: i,
      minPrice: minPrice === Infinity ? null : minPrice,
      maxProfit: maxProfit,
      currentProfit: profit,
      message: `Day ${i}: price = ${array[i]}, min price so far = ${minPrice === Infinity ? 'N/A' : minPrice}, potential profit = ${profit}`,
    };
    
    if (array[i] < minPrice) {
      minPrice = array[i];
      currentBuyDay = i;
      
      yield {
        array: [...array],
        buyDay: buyDay,
        sellDay: sellDay,
        currentBuyDay: currentBuyDay,
        currentDay: i,
        minPrice: minPrice,
        maxProfit: maxProfit,
        message: `New minimum price found: ${minPrice} at day ${i}`,
      };
    }
    
    if (profit > maxProfit) {
      maxProfit = profit;
      buyDay = currentBuyDay;
      sellDay = i;
      
      yield {
        array: [...array],
        buyDay: buyDay,
        sellDay: sellDay,
        currentBuyDay: currentBuyDay,
        currentDay: i,
        minPrice: minPrice,
        maxProfit: maxProfit,
        message: `New maximum profit: ${maxProfit} (buy on day ${buyDay}, sell on day ${sellDay})`,
      };
    }
  }
  
  yield {
    array: [...array],
    buyDay: buyDay,
    sellDay: sellDay,
    currentBuyDay: currentBuyDay,
    currentDay: -1,
    minPrice: minPrice,
    maxProfit: maxProfit,
    message: `Final result: Maximum profit = ${maxProfit}`,
  };
  
  return maxProfit;
}
