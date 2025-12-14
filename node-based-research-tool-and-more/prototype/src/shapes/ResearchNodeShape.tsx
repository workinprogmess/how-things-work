import {
  ShapeUtil,
  HTMLContainer,
  T,
  Rectangle2d,
  TLShapeId,
} from 'tldraw'

// define the shape type
export interface ResearchNodeShape {
  id: TLShapeId
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
  }
  parentId: any
  index: any
  meta: any
  typeName: 'shape'
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
  }

  // default props for new shapes
  getDefaultProps() {
    return {
      w: 400,
      h: 250,
      question: '',
      response: '',
      isLoading: false,
    }
  }

  // geometry for hit testing
  getGeometry(shape: ResearchNodeShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  // render the shape
  component(shape: ResearchNodeShape) {
    const { question, response, isLoading } = shape.props

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
          }}
        >
          {/* question section */}
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

          {/* response section */}
          <div
            style={{
              flex: 1,
              padding: '12px 16px',
              overflow: 'auto',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#333',
            }}
          >
            {isLoading ? (
              <div style={{ color: '#888', fontStyle: 'italic' }}>
                thinking...
              </div>
            ) : response ? (
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {response}
              </div>
            ) : (
              <div style={{ color: '#aaa', fontStyle: 'italic' }}>
                response will appear here...
              </div>
            )}
          </div>
        </div>
      </HTMLContainer>
    )
  }

  // indicator when shape is selected
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
}
