/* eslint-disable react/display-name */
import {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  memo,
  useCallback,
} from "react";

const reducer = (state: any, newState: any) => ({ ...state, ...newState });

interface CroppedTextProps {
  lines?: number;
  className?: string;
  children: ReactNode;
}

export const CroppedText = memo(
  ({ lines = 2, className, children }: CroppedTextProps) => {
    const [state, setState] = useReducer(reducer, {
      text: ".",
      noClamp: false,
    });
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const symbolRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const node = nodeRef.current;
      const resizeObserver = new window.ResizeObserver((entries) => {
        crop();
      });

      if (node) {
        crop();
        resizeObserver.observe(node);
      }

      return () => {
        if (node) {
          resizeObserver.unobserve(node);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const crop = useCallback(() => {
      if (
        !nodeRef.current ||
        !symbolRef.current ||
        !children ||
        typeof children !== "string"
      ) {
        return;
      }

      const lineHeight = symbolRef.current.clientHeight + 1;
      const maxHeight = lineHeight * lines + 1;
      let start = 0;
      let middle = 0;
      let end = children.length;

      while (start <= end) {
        middle = Math.floor((start + end) / 2);
        nodeRef.current.innerText = children.slice(0, middle);
        if (middle === children.length) {
          setState({ text: children, noClamp: true });

          return;
        }

        if (nodeRef.current.clientHeight <= maxHeight) {
          start = middle + 1;
        } else {
          end = middle - 1;
        }
      }

      const ellipsis = !state.noClamp ? "..." : "";
      nodeRef.current.innerText = children.slice(0, middle - 5) + ellipsis;
      setState({
        text: children.slice(0, middle - 5) + ellipsis,
      });
    }, [children, lines, state.noClamp]);

    if (typeof children !== "string" || !children) {
      console.error("Children of `CroppedText` should be raw text");
      return null;
    }

    return (
      <div style={{ position: "relative" }}>
        <p ref={nodeRef} className={className}>
          {state.text}
        </p>
        <div
          ref={symbolRef}
          className={className}
          style={{
            visibility: "hidden",
            userSelect: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          .
        </div>
      </div>
    );
  }
);
