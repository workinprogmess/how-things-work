import { useState, useCallback, useRef, useEffect } from 'react'
import {
  ShapeUtil,
  HTMLContainer,
  T,
  Rectangle2d,
  useEditor,
  useIsEditing,
  createShapeId,
} from 'tldraw'

// define the shape type - using 'any' for tldraw internal types
export interface ResearchNodeShape {
  id: any
  type: 'research-node'
  x: number
  y: number
  rotation: number
  isLocked: boolean
  opacity: number
  props: {
    w: number
    h: number
    question: string
    response: string
    isLoading: boolean
    parentNodeId: string | null // track parent for tree structure
  }
  parentId: any
  index: any
  meta: any
  typeName: 'shape'
}

// separate component to use hooks
function ResearchNodeComponent({ shape }: { shape: ResearchNodeShape }) {
  const editor = useEditor()
  const isEditing = useIsEditing(shape.id)
  const [selectedText, setSelectedText] = useState('')
  const [showBranchButton, setShowBranchButton] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const responseRef = useRef<HTMLDivElement>(null)

  const { question, response, isLoading } = shape.props

  // clear selection when exiting edit mode
  useEffect(() => {
    if (!isEditing) {
      setShowBranchButton(false)
      setSelectedText('')
    }
  }, [isEditing])

  // attach native event listeners to capture events before tldraw
  useEffect(() => {
    const el = responseRef.current
    if (!el || !isEditing) return

    const stop = (e: Event) => {
      e.stopPropagation()
    }

    // use capture phase to intercept before tldraw
    el.addEventListener('pointerdown', stop, { capture: true })
    el.addEventListener('pointermove', stop, { capture: true })
    el.addEventListener('pointerup', stop, { capture: true })
    el.addEventListener('mousedown', stop, { capture: true })
    el.addEventListener('mousemove', stop, { capture: true })
    el.addEventListener('mouseup', stop, { capture: true })

    return () => {
      el.removeEventListener('pointerdown', stop, { capture: true })
      el.removeEventListener('pointermove', stop, { capture: true })
      el.removeEventListener('pointerup', stop, { capture: true })
      el.removeEventListener('mousedown', stop, { capture: true })
      el.removeEventListener('mousemove', stop, { capture: true })
      el.removeEventListener('mouseup', stop, { capture: true })
    }
  }, [isEditing])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isEditing) return

    // small delay to let selection complete
    setTimeout(() => {
      const selection = window.getSelection()
      const text = selection?.toString().trim()

      if (text && text.length > 0) {
        setSelectedText(text)
        setShowBranchButton(true)

        // position button near selection
        const range = selection?.getRangeAt(0)
        if (range) {
          const rect = range.getBoundingClientRect()
          setButtonPosition({
            x: rect.right - rect.left > 200 ? rect.left + 100 : rect.right,
            y: rect.bottom + 5,
          })
        }
      } else {
        setShowBranchButton(false)
        setSelectedText('')
      }
    }, 10)
  }, [isEditing])

  const handleBranch = useCallback(() => {
    if (!selectedText) return

    // create new node to the right of current node
    const newId = createShapeId()
    const newX = shape.x + shape.props.w + 100
    const newY = shape.y

    editor.createShape({
      id: newId,
      type: 'research-node',
      x: newX,
      y: newY,
      props: {
        w: 400,
        h: 350,
        question: selectedText,
        response: '',
        isLoading: true,
        parentNodeId: shape.id,
      },
    })

    // simulate llm response (will be replaced with gemini api)
    setTimeout(() => {
      editor.updateShape({
        id: newId,
        type: 'research-node',
        props: {
          isLoading: false,
          response: `this is a simulated response about "${selectedText}".\n\ncontext from parent: the user was exploring "${question}" and wanted to dive deeper into this specific concept.\n\n[this will be replaced with actual gemini api responses]`,
        },
      })
    }, 1500)

    // clear selection state
    setShowBranchButton(false)
    setSelectedText('')
    window.getSelection()?.removeAllRanges()

    // pan to show new node
    editor.zoomToFit({ animation: { duration: 300 } })
  }, [editor, selectedText, shape])

  return (
    <HTMLContainer
      id={shape.id}
      style={{
        width: shape.props.w,
        height: shape.props.h,
        pointerEvents: 'all',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#f8f9fa',
            minHeight: '60px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            question
          </div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>
            {question || 'what do you want to learn about?'}
          </div>
        </div>

        <div
          ref={responseRef}
          style={{
            flex: 1,
            padding: '12px 16px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#333',
            userSelect: isEditing ? 'text' : 'none',
            cursor: isEditing ? 'text' : 'default',
            backgroundColor: isEditing ? '#fffef0' : 'transparent',
          }}
          onMouseUp={handleMouseUp}
        >
          {isLoading ? (
            <div style={{ color: '#888', fontStyle: 'italic' }}>thinking...</div>
          ) : response ? (
            <>
              <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
              {!isEditing && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  double-click to select text and branch
                </div>
              )}
            </>
          ) : (
            <div style={{ color: '#aaa', fontStyle: 'italic' }}>
              response will appear here...
            </div>
          )}
        </div>

        {showBranchButton && (
          <button
            onClick={handleBranch}
            style={{
              position: 'fixed',
              left: buttonPosition.x,
              top: buttonPosition.y,
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
            }}
          >
            branch →
          </button>
        )}
      </div>
    </HTMLContainer>
  )
}

// the shape util class
export class ResearchNodeShapeUtil extends ShapeUtil<ResearchNodeShape> {
  static override type = 'research-node' as const
  static override props = {
    w: T.number,
    h: T.number,
    question: T.string,
    response: T.string,
    isLoading: T.boolean,
    parentNodeId: T.string.nullable(),
  }

  getDefaultProps() {
    return {
      w: 400,
      h: 350,
      question: '',
      response: '',
      isLoading: false,
      parentNodeId: null,
    }
  }

  getGeometry(shape: ResearchNodeShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: ResearchNodeShape) {
    return <ResearchNodeComponent shape={shape} />
  }

  indicator(shape: ResearchNodeShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        rx={12}
        ry={12}
      />
    )
  }

  // enable editing mode (double-click to enter)
  override canEdit() {
    return true
  }

  // enable resize handles
  override canResize() {
    return true
  }

  // handle resize
  override onResize(shape: ResearchNodeShape, info: { initialShape: ResearchNodeShape; scaleX: number; scaleY: number }) {
    return {
      props: {
        w: Math.max(200, info.initialShape.props.w * info.scaleX),
        h: Math.max(150, info.initialShape.props.h * info.scaleY),
      },
    }
  }
}
