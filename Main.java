import java.util.regex.*;
public class Main {

	public static void main(String[] args) {
		// First the user input is checked for errors like invalid user names
		// Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen
		System.out.print("Note: Only the first parameter will be taken into account for the search"
				+ "\nRemember that the username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen\n");
		if (args.length == 0) {
			System.err.println("\nNo parameters passed");
			return;
		}
		String username = args[0]; 
		Pattern username_pattern = Pattern.compile("\\b-{2,}\\b|[^a-zA-Z0-9-]|^-|-$");
		Matcher username_checker = username_pattern.matcher(username);
		boolean incorrect_username = username_checker.find();
		
		if (incorrect_username || username.length() > 39) {
			System.err.print("\n" + "\"" + username + "\"" + " is not a valid username");
		}
		
		
	}
	
	public boolean checkInput(String[] )
	
	public void fetchUserData(String username, String token) {
		
	}
}
