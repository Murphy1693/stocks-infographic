

const GraphSettings = ({setTimePeriod, timePeriod}) => {

  return <div className='flex justify-center text-white gap-8 md:flex md:flex-col md:justify-start md:gap-4'>
    <button className={timePeriod === 3 ? 'opacity-1' : 'opacity-70'} onClick={() => {
      setTimePeriod(3)
    }}>3 Years</button>
    <button className={timePeriod === 2 ? 'opacity-1' : 'opacity-70'} onClick={() => {
      setTimePeriod(2);
    }}>1 Year</button>
    <button className={timePeriod === 1 ? 'opacity-1' : 'opacity-70'} onClick={() => {
      setTimePeriod(1);
    }}>Year to Date</button>
    <button className={timePeriod === 0 ? 'opacity-1' : 'opacity-70'} onClick={() => {
      setTimePeriod(0);
    }}>Daily</button>
  </div>

}

export default GraphSettings