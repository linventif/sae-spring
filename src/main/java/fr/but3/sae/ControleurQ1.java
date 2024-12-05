package fr.but3.sae;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;

@Controller
class ControleurQ1 {
  @RequestMapping({ "/hello", "/" })
  // @ResponseBody
  String hello(HttpServletRequest request, ModelMap modelmap) {
    String name = request.getParameter("name");
    if (name == null || name.isEmpty())
      name = "World";
    modelmap.addAttribute("cle", name);
    return "mavue";
  }
}