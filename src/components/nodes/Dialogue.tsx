import { NodeProps, Handle, Position } from "reactflow";

export function Dialogue(props:NodeProps){
  return (
    <div className="bg-amber-500 rounded w-[200px] h-[100px]" >
      <Handle position={Position.Right} id="right" type="source" className="-right-5 w-3 h-3 bg-blue-400"/>
      <Handle position={Position.Left} id="left" type="target" className="-left-5 w-3 h-3 bg-blue-400/80"/>
      <h1>Dialogue</h1>
    </div>
  )
}