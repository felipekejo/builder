import { NodeProps, Handle, Position } from "reactflow";

export function Square(props:NodeProps){
  return (
    <div className="bg-violet-500 rounded w-[200px] h-[100px]" >
      <Handle position={Position.Right} id="right" type="source" className="-right-5 w-3 h-3 bg-blue-400"/>
      <Handle position={Position.Left} id="left" type="target" className="-left-5 w-3 h-3 bg-blue-400/80"/>

    </div>
  )
}