import { useEffect, useRef, useState } from "react"
import LineGraph, { options } from "../graph";
import axios from "axios";
import { graphSubscribable, subscribable } from "../utils/subscription";
import GraphSettings from "./GraphSettings";

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
  return <div className="flex pt-4 justify-center">
    <div ref={graphRef}>
    </div>
  <GraphSettings></GraphSettings>
  </div>
}

export default Graph;