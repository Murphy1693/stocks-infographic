import { useEffect, useRef, useState } from "react"
import LineGraph, { options } from "../graph";
import axios from "axios";
import { graphSubscribable, subscribable } from "../utils/subscription";

type GraphProps = {
  graphSubscription: graphSubscribable
}

const Graph = ({graphSubscription}: GraphProps) => {
  const [symbol, setSymbol] = useState("TSLA");
  // const [graphData, setGraphData] = useState([]);
  const graphRef = useRef(null);

  useEffect(() => {
    graphSubscription.subscribe(setSymbol);
    axios.get(`/api/closingPrice?alpha_symbol=${symbol}`).then((response) => {
      console.log(response.data);
      LineGraph(graphRef.current, response.data.results, {...options, title: response.data.name, yDomain: [0, (1.2 * response.data.max)]})
    })
  }, [symbol])
  return <div onClick={() => {
    setSymbol("AMZN");
  }} className="flex items-center" ref={graphRef}></div>
}

export default Graph;