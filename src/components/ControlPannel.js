

function ControlPannel({switchState, handleSwitch}) {
    return (
        <div className="flex flex-col basis-[60%] justify-around shadow-lg rounded-lg border m-2 py-5 px-10 bg-white">
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="openSwitch">
                    Open the door
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[0]} name="openSwitch" id="openSwitch"
                    type="checkbox" onChange={() => handleSwitch(0)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='openSwitch'>
                    {switchState[0] ? "On" : "Off"}
                </label>
            </div>
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="systemSwitch">
                    System
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[1]} name="systemSwitch" id="systemSwitch"
                    type="checkbox" onChange={() => handleSwitch(1)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='systemSwitch'>
                    {switchState[1] ? "On" : "Off"}
                </label>
            </div>
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="notiSwitch">
                    Notification
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[2]} name="notiSwitch" id="notiSwitch"
                    type="checkbox" onChange={() => handleSwitch(switchState[1] ? 2 : null)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='notiSwitch'>
                    {switchState[2] ? "On" : "Off"}
                </label>
            </div>
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="alarmSwitch">
                    Alarm
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[3]} name="alarmSwitch" id="alarmSwitch"
                    type="checkbox" onChange={() => handleSwitch(switchState[1] ? 3 : null)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='alarmSwitch'>
                    {switchState[3] ? "On" : "Off"}
                </label>
            </div>
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="doorSwitch">
                    Door Sensor
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[4]} name="doorSwitch" id="doorSwitch"
                    type="checkbox" onChange={() => handleSwitch(switchState[1] ? 4 : null)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='doorSwitch'>
                    {switchState[4] ? "On" : "Off"}
                </label>
            </div>
            <div className='flex items-center'>
                <label className='font-semibold text-2xl basis-[50%] hover:cursor-pointer' htmlFor="distanceSwitch">
                    Distance Sensor
                </label>
                <input
                    className='switch rounded-full w-[4em] h-[2em] hover:cursor-pointer'
                    checked={switchState[5]} name="distanceSwitch" id="distanceSwitch"
                    type="checkbox" onChange={() => handleSwitch(switchState[1] ? 5 : null)}/>
                <label className='ml-3 font-semibold text-xl hover:cursor-pointer'
                    htmlFor='distanceSwitch'>
                    {switchState[5] ? "On" : "Off"}
                </label>
            </div>
        </div>
    )
}
export default ControlPannel;