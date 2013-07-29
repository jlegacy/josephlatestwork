package org.apache.jsp.main;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("\t<head>\r\n");
      out.write("\t\t<title>Dancik Selection Sheet Manager</title>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../../dws/js/ui-themes/smoothness/smoothness.css\"/>\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../../dws/js/jquery-plugins/css/jquery.growler.css\"></link>\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../../dws/js-components/calendar/calendarObject.css\"></link>\r\n");
      out.write("\r\n");
      out.write("\t\t<!--CSS-MINIFY-->\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../js/ui-themes/start/start.css\"></link>\r\n");
      out.write("\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/ui-overrides.css\"></link>\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/ssm.css\"></link>\r\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/sprites.css\"></link>\r\n");
      out.write("\t\t<!--CSS-MINIFY-->\r\n");
      out.write("\t</head>\r\n");
      out.write("\r\n");
      out.write("\t<body class=\"ssm-main\">\r\n");
      out.write("\t\t<div class=\"maintop\" id=\"app\"></div>\r\n");
      out.write("\t\t<div id=\"ssm_growler\"></div>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<!-- jQuery -->\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-1.7.1.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script type=\"text/javascript\">\r\n");
      out.write("\t\t   $j = jQuery.noConflict()\r\n");
      out.write("\t\t</script>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t\r\n");
      out.write("\t    <script src=\"../../dws/js/jquery-ui-1.8.14.custom.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-plugins/jquery.ba-bbq.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-plugins/jquery.serializeobject.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-plugins/jquery.growler.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-plugins/jquery.validate.1.9.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jquery-plugins/jquery.watermark.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/jclass.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/json2.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/base64.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/ejs.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/messages.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/js/appFramework.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("\t\t<script src=\"../js/ssm-plugins/jquery.autotab.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<script type=\"text/javascript\">\r\n");
      out.write("\t\t\tEJS.config({cache: false})\t\t\r\n");
      out.write("\t\t\tnew Application({\r\n");
      out.write("\t\t\t\tappRoot: 'app',\r\n");
      out.write("\t\t\t\tprofile: 'development'\r\n");
      out.write("\t\t\t});\r\n");
      out.write("\t\t</script>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<!-- DWS Models -->\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/model/base.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<!-- DWS Views -->\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/view/growler.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/view/messaging.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/view/ods.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/view/help.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<!-- DWS Controllers -->\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/controller/growler.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/controller/messaging.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/controller/ods.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t<script src=\"../../dws/mvc/controller/help.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("\t\t<script type=\"text/ejs\" id='appBase'>\r\n");
      out.write("\t\t\t");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "app/template/appBase.ejs", out, true);
      out.write("\r\n");
      out.write("\t\t</script>\t\r\n");
      out.write("\r\n");
      out.write("\t\t<!--MINIFY-->\r\n");
      out.write("\t\t\t<!-- Configuration -->\r\n");
      out.write("\t\t\t<script src=\"app/config/profiles.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/config/routes.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/config/messages.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/config/utils.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("\t\t\t<!-- Models -->\r\n");
      out.write("\t\t\t<script src=\"app/model/ssm-ajax.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/application.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/cache.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/config.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/dashboard.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/ods.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/reminders.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/reports.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/reportsDrilldown.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/selection.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/selectionItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/selectionSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/customerSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/references.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/jobs.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/itemSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/kits.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/editLine.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/ordering.js\" type=\"text/javascript\"></script>\t\t\t\r\n");
      out.write("\t\t\t<script src=\"app/model/relatedItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/model/itemDetails.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("\t\t\t<!-- Controllers -->\r\n");
      out.write("\t\t\t<script src=\"app/controller/application.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/cache.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/config.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/dashboard.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/not_authorized.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/ods.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/reminders.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/reports.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/reportsDrilldown.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/selection.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/selectionItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/selectionSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/customerSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/references.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/jobs.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/itemSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/kits.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/editLine.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/ordering.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/relatedItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/itemDetails.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/controller/messages.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("\t\t\t<!-- Views -->\r\n");
      out.write("\t\t\t<script src=\"app/view/application.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/dashboard.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/not_authorized.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/ods.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/reminders.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/reports.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/reportsDrilldown.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/selection.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/selectionItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/selectionSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/customerSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/references.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/jobs.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/itemSearch.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/kits.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/editLine.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/ordering.js\" type=\"text/javascript\"></script>\t\t\t\r\n");
      out.write("\t\t\t<script src=\"app/view/relatedItems.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/itemDetails.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<script src=\"app/view/messages.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\r\n");
      out.write("\r\n");
      out.write("\t\t\t<!--Boot the app -->\r\n");
      out.write("\t\t\t<script src=\"app/config/boot.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t\t\t<!--MINIFY-->\r\n");
      out.write("\t\t\r\n");
      out.write("\t</body>\r\n");
      out.write("</html>\t\t");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
