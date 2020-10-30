import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import G6 from '@antv/g6'
import { Button } from 'antd'

function AntVDemo() {
  const data = {
    // 点集
    nodes: [
      {
        id: 'node1', // String，该节点存在则必须，节点的唯一标识
        x: 100, // Number，可选，节点位置的 x 值
        y: 200, // Number，可选，节点位置的 y 值
        label: '起始点',
      },
      {
        id: 'node2', // String，该节点存在则必须，节点的唯一标识
        x: 300, // Number，可选，节点位置的 x 值
        y: 200, // Number，可选，节点位置的 y 值
        label: '目标点',
      },
    ],
    // 边集
    edges: [
      {
        source: 'node1', // String，必须，起始点 id
        target: 'node2', // String，必须，目标点 id
        label: '连线',
      },
    ],
  }
  const nodeRef = useRef(null)
  const [tarData, settarData] = useState(data)
  const getRemoteData = async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
    )
    const remoteData = await response.json()
    settarData(remoteData)
  }
  useEffect(() => {
    let graph = null
    // setTimeout(() => {
    console.log('effect')
    if (graph) {
      return
    }
    graph = new G6.Graph({
      // container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      container: ReactDOM.findDOMNode(nodeRef.current),
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      fitView: true, // 设置是否将图适配到画布中
      fitViewPadding: [20, 40, 50, 20], // 画布上四周的留白宽度。
      animate: true,
    })
    graph.data(tarData) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
    // }, 1000)
  }, [tarData])
  return (
    <div className='conts'>
      <div id='mountNode' ref={nodeRef}></div>
      <Button onClick={getRemoteData}>获取数据</Button>
    </div>
  )
}
export default AntVDemo
