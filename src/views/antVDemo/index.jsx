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
    const nodes = remoteData.nodes
    // 节点数据处理
    nodes.forEach((node) => {
      if (!node.style) {
        node.style = {}
      }
      switch (
        node.class // 根据节点数据中的 class 属性配置图形
      ) {
        case 'c0': {
          node.type = 'circle' // class = 'c0' 时节点图形为 circle
          break
        }
        case 'c1': {
          node.type = 'rect' // class = 'c1' 时节点图形为 rect
          node.size = [35, 20] // class = 'c1' 时节点大小
          break
        }
        case 'c2': {
          node.type = 'ellipse' // class = 'c2' 时节点图形为 ellipse
          node.size = [35, 20] // class = 'c2' 时节点大小
          break
        }
        default: {
          break
        }
      }
    })
    const edges = remoteData.edges
    // 边数据处理
    edges.forEach((edge) => {
      if (!edge.style) {
        edge.style = {}
      }
      edge.style.lineWidth = edge.weight // 边的粗细映射边数据中的 weight 属性数值
      // 移到此处
      edge.style.opacity = 0.6
      edge.style.stroke = 'grey'
    })
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
      width: 1000, // Number，必须，图的宽度
      height: 800, // Number，必须，图的高度
      // fitView: true, // 设置是否将图适配到画布中
      // fitViewPadding: [20, 40, 50, 20], // 画布上四周的留白宽度。
      animate: true,
      layout: {
        // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: 'force', // 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
      },
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
