import { useEffect, useRef, useState } from 'react'

function BatteryCapacity({percent}) {
    const svgRef = useRef(null);
    const [r, setR] = useState(0);
    useEffect(() => {
        const element = svgRef.current;
        if (!element) return;
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setR(entry.contentRect.height * 0.5);
            }
        });
        resizeObserver.observe(element);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="batteryCapacity">
            <section>
                <svg
                    className='circle-chart w-[250px] h-[250px]'
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    
                >
                    <circle
                        className="circle-chart__background"
                        stroke="#efefef"
                        strokeWidth={`${r*0.18}`}
                        fill="none"
                        cx="50%"
                        cy="50%"
                        r="40%"
                    />
                    <circle
                        className="circle-chart__circle"
                        stroke="#00acc1"
                        strokeWidth={`${r*0.18}`}
                        strokeDasharray={`${2*3.14*r*percent}, ${2*3.14*r}`}
                        strokeLinecap="round"
                        fill="none"
                        cx="50%"
                        cy="50%"
                        r="40%"
                    />
                    <g className="circle-chart__info">
                        <text
                            className="circle-chart__percent font-semibold text-[30px]"
                            x="50%"
                            y="50%"
                            alignmentBaseline="central"
                            textAnchor="middle"
                        >
                            {`${percent*100}%`}
                        </text>
                    </g>
                </svg>
            </section>
        </div>
    )
}
export default BatteryCapacity