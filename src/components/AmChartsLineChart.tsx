import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export interface ChartDataPoint {
  date: string | Date;
  value: number;
}

export interface AmChartsLineChartProps {
  data: ChartDataPoint[];
  width?: string;
  height?: string;
  dateFormat?: string;
  valueFieldName?: string;
  dateFieldName?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  bulletRadius?: number;
  enablePan?: boolean;
  enableZoom?: boolean;
  enableScrollbar?: boolean;
  enableCursor?: boolean;
  minGridDistance?: number;
  //   animationDuration?: number;
  //   animationDelay?: number;
  tooltipText?: string;
  className?: string;
  timeUnit?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "year";
  yAxisUnit?: string;
  xAxisDateFormat?: string;
  tooltipDateFormat?: string;
}

const AmChartsLineChart: React.FC<AmChartsLineChartProps> = ({
  data = [],
  width = "100%",
  height = "400px",
  dateFormat = "yyyy-MM-dd",
  valueFieldName = "value",
  dateFieldName = "date",
  strokeWidth = 2,
  fillOpacity = 0.2,
  bulletRadius = 4,
  enablePan = true,
  enableZoom = true,
  enableScrollbar = true,
  enableCursor = true,
  minGridDistance = 70,
  //   animationDuration = 1000,
  //   animationDelay = 100,
  tooltipText = "{valueY}",
  className = "",
  timeUnit = "day",
  yAxisUnit = "",
  xAxisDateFormat = "MMM dd",
  tooltipDateFormat = "MMM dd, yyyy",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Set date formatter for root
    root.dateFormatter.setAll({
      dateFormat: tooltipDateFormat,
      dateFields: ["valueX"],
    });

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: enablePan,
        panY: enablePan,
        wheelX: enableZoom ? "panX" : "none",
        wheelY: enableZoom ? "zoomX" : "none",
        pinchZoomX: enableZoom,
        paddingLeft: 0,
      })
    );

    // Create X axis renderer
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: minGridDistance,
    });

    // Create X axis (Date/Time axis)
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: timeUnit,
          count: 1,
        },
        renderer: xRenderer,
      })
    );

    // Create Y axis renderer
    const yRenderer = am5xy.AxisRendererY.new(root, {});

    // Create Y axis (Value axis)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: yRenderer,
      })
    );

    // Create line series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        connect: false,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueFieldName,
        valueXField: dateFieldName,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText:
            "{" +
            dateFieldName +
            ".formatDate('" +
            tooltipDateFormat +
            "')}: {" +
            valueFieldName +
            "}" +
            yAxisUnit,
        }),
      })
    );

    // Configure series appearance
    series.fills.template.setAll({
      fillOpacity: fillOpacity,
      visible: true,
    });

    series.strokes.template.setAll({
      strokeWidth: strokeWidth,
    });

    // Set up data processor to parse string dates
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: dateFormat,
      dateFields: [dateFieldName],
    });

    // Set data
    series.data.setAll(data);

    // Add bullets (data points)
    series.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: bulletRadius,
        fill: root.interfaceColors.get("background"),
        stroke: series.get("fill"),
        strokeWidth: 2,
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    // Add cursor if enabled
    if (enableCursor) {
      const cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          xAxis: xAxis,
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);
    }

    // Add scrollbar if enabled
    if (enableScrollbar) {
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      );
    }

    // Animate chart on load
    // chart.appear(animationDuration, animationDelay);

    // Cleanup function
    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, [
    data,
    dateFormat,
    valueFieldName,
    dateFieldName,
    strokeWidth,
    fillOpacity,
    bulletRadius,
    enablePan,
    enableZoom,
    enableScrollbar,
    enableCursor,
    minGridDistance,
    // animationDuration,
    // animationDelay,
    tooltipText,
    timeUnit,
    yAxisUnit,
    xAxisDateFormat,
    tooltipDateFormat,
  ]);

  return <div ref={chartRef} className={className} style={{ width, height }} />;
};

export default AmChartsLineChart;
