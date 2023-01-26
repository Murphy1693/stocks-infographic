import { useEffect, useRef, useState } from "react"
import LineGraph, { options } from "../graph";
import axios from "axios";

const Graph = () => {
  const [symbol, setSymbol] = useState("ASTS");
  // const [graphData, setGraphData] = useState([]);
  const graphRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/yahooPrices?symbol=${symbol}`).then((response) => {
      LineGraph(graphRef.current, response.data, options)
    })
  }, [symbol])
  return <div onClick={() => {
    setSymbol("AMZN");
  }} className="flex items-center" ref={graphRef}></div>
}

export default Graph;