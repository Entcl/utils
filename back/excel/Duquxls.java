package model;

import java.io.File;
import java.io.FileInputStream;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

public class Duquxls {
	public static String xls2String(File file) {
		String result = "";
		try {
			FileInputStream fis = new FileInputStream(file);
			StringBuilder sb = new StringBuilder();
			jxl.Workbook rwb = Workbook.getWorkbook(fis);
			Sheet[] sheet = rwb.getSheets();
			for (int i = 0; i < sheet.length; i++) {
				Sheet rs = rwb.getSheet(i);
				for (int j = 0; j < rs.getRows(); j++) {
					Cell[] cells = rs.getRow(j);
					for (int k = 0; k < cells.length; k++)
						sb.append(cells[k].getContents());
				}
			}
			fis.close();
			result += sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(result);
		return result;
	}

	public static void main(String[] args,String filepath) {
		
//		File file = new File(filepath);
//		File file = new File("D:/test/a1.xls");
//		System.out.println(xls2String(file));
	}

}
