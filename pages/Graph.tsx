import { useEffect, useRef, useState } from "react"
import LineGraph, { options } from "../graph";
import axios from "axios";
import { graphSubscribable, subscribable } from "../utils/subscription";
import GraphSettings from "./GraphSettings";

type GraphProps = {
  graphSubscription: graphSubscribable
}

let x = new Date();
x.setDate(x.getDate() -1)

const timePeriods: {[key: number]: number} = {
  0: 1000 * x.getTime(), /* Today */
  1: 1672216920000,/* Dec 28 2022 */
  2: 1640853720000,/* Dec 30 2021 */
  3: 1577781720000, /* Dec 31 2019 */
}

const Graph = ({graphSubscription}: GraphProps) => {
  const [symbol, setSymbol] = useState("TSLA");
  const [display, setDisplay] = useState('');
  const [timePeriod, setTimePeriod] = useState(3);
  const graphRef = useRef(null);

  useEffect(() => {
    graphSubscription.subscribe(setSymbol);
    if (timePeriod === 0) {
      axios.get(`/api/currentPrice?finnhub_symbol=${symbol}`).then((response) => {
        console.log(response)
        setDisplay(response.data.name);
        let difference = 1.1 * (response.data.max - response.data.min);
        LineGraph(graphRef.current, response.data.results, {...options, title: response.data.name, yDomain: [response.data.min, (difference + response.data.max)]})
      })
    } else {
      axios.get(`/api/closingPrice?alpha_symbol=${symbol}&time=${timePeriods[timePeriod]}`).then((response) => {
        console.log(response)
        setDisplay(response.data.name);
        LineGraph(graphRef.current, response.data.results, {...options, title: response.data.name, yDomain: [0, (1.2 * response.data.max)]})
      })
    }
  }, [symbol, timePeriod])

  return <div className="flex flex-col pt-4 justify-center md:flex md:flex-row">
    <div className="relative">
      <span className="absolute text-white -top-4 left-1/2 -translate-x-1/2">{display}</span>
      <div ref={graphRef}>
      </div>
    </div>
  <GraphSettings timePeriod={timePeriod} setTimePeriod={setTimePeriod}></GraphSettings>
  </div>
}

export default Graph;