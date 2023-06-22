import { NodeProps, Handle, Position } from "reactflow";

export function Square(props:NodeProps){
  return (
    <div className="bg-violet-500 rounded w-[200px] h-[200px]" >
      <Handle position={Position.Right} id="right" type="source"/>
      <Handle position={Position.Left} id="left" type="target" />

    </div>
  )
}