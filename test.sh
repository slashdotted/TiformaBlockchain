RED='\033[0;31m' # color red
NC='\033[0m' # No Color
GREEN='\033[0;32m' # color green
bold=$(tput bold)
normal=$(tput sgr0)
HOST="http://localhost:8080"

function TRUE(){
	printf "${GREEN}${bold}SUCCESS${normal}${NC}\n"
}
function FALSE(){
	printf "${RED}${bold}FAIL${normal}${NC}\n"
}



#create_student(){
#    response=$(curl -d '{"contactID":"'"1"'", "name":"'"zyril errol"'", "surname":"'"gatchalian"'", "birthday":"2019-05-16T00:00:00.0Z", "nationality":"italian", "statute":"Immatricolato", "studyPlan": "r", "serialNumber": "'"1"'"}' -H "Authorization: Bearer ${wrongToken}" -X POST "${HOST}/CreateStudent")
#	if [ ${response} -eq '0' ]
#		then FALSE
#		else TRUE
#	fi
#}

#create_student


################################### COURSES ###################################
create_course(){
    curl -d '{"courseCode": "'"$1"'", "name": "'"$2"'"}' -H "Content-Type: application/json" -H "Authorization: Bearer $3" -X POST "${HOST}/CreateCourse"

}

################################### MODULES ###################################
create_module(){
    curl -d '{"moduleCode":"'"$1"'", "name":"'"$2"'", "duration":"'"$3"'", "ETCS": "'"$4"'", "department" : "resource:ch.supsi.Department#DTI", "state": "attivo", "courses": [] }' -H "Content-Type: application/json" -H "Authorization: Bearer $5" -X POST "${HOST}/CreateModule"
}

add_course_to_module(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
   "$class": "ch.supsi.AddCourseToModule", 
   "course": "resource:ch.supsi.Course#'"$1"'", 
   "module": "resource:ch.supsi.Module#'"$2"'"  
 }' "${HOST}/AddCourseToModule"
}

################################### DEPARTMENTS ###################################
create_department(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $2" -d '{ 
    "$class": "ch.supsi.CreateDepartment", 
    "departmentID": "'"$1"'", 
    "name": "'"$1"'" 
    }' "${HOST}/CreateDepartment"
}

################################### STUDENTS ###################################
create_student(){
    curl -d '{"contactID":"'"$1"'", "name":"'"$2"'", "surname":"'"$3"'", "birthday":"2019-05-16T00:00:00.0Z", "nationality":"swiss", "statute":"Immatricolato", "studyPlan": "resource:ch.supsi.StudyPlan#Ingegneria informatica TP", "serialNumber": "'"$4"'"}' -H "Content-Type: application/json" -H "Authorization: Bearer $5" -X POST "${HOST}/CreateStudent"
}

################################### STUDYPLANS ###################################
create_studyPlan(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
   "$class": "ch.supsi.CreateStudyPlan", 
   "name": "'"$1"'",
   "department": "resource:ch.supsi.Department#'"$2"'", 
   "state": "Attivo", 
   "comment": "Nessuno.", 
   "modules": [] 
 }' "${HOST}/CreateStudyPlan"
}

add_module_to_studyPlan(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{
   "$class": "ch.supsi.AddModuleToStudyPlan",
   "module": "resource:ch.supsi.Module#'"$1"'",
   "studyplan": "resource:ch.supsi.StudyPlan#'"$2"'"
 }' "${HOST}/AddModuleToStudyPlan"
}

################################### STUDENTMODULES ###################################
create_studentModule(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
   "$class": "ch.supsi.CreateStudentModule", 
   "studentModuleID": "'"$1"'", 
   "module": "resource:ch.supsi.Module#'"$2"'", 
   "students": [] 
    }' "${HOST}/CreateStudentModule"
}

################################### SEMESTERS ###################################
create_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
   "$class": "ch.supsi.CreateSemester", 
   "name": "'"$1"'", 
   "description": "'"$2"'", 
   "modules": [] 
    }' "${HOST}/CreateSemester"
}

add_studentModule_to_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
    "$class": "ch.supsi.AddStudentModuleToSemester", 
    "studentModule": "resource:ch.supsi.StudentModule#'"$1"'", 
    "semester": "resource:ch.supsi.Semester#'"$2"'" 
    }' "${HOST}/AddStudentModuleToSemester"
}

subscribe_student_to_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -H "Authorization: Bearer $3" -d '{ 
    "$class": "ch.supsi.SubscriptionToSemester", 
    "student": "resource:ch.supsi.Student#'"$1"'", 
    "semester": "resource:ch.supsi.Semester#'"$2"'" 
    }' "${HOST}/SubscriptionToSemester"
}

###################################### USERS #################################
get_users(){
	curl "${HOST}/users" -H "Authorization: Bearer $1"
}

################################### MAIN ###################################

rightToken=$1
wrongToken="casa"

#CREATE COURSE
response=$(create_course "C08003" "Algoritmi avanzati" $wrongToken)
printf "Test: \e[33m create_course con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi

response=$(create_course "C08003" "Algoritmi avanzati" $rightToken)
printf "Test: \e[33m create_course con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi

#CREATE MODULE
response=$(create_module "M02043" "Applicazioni distribuite" 1 6 $wrongToken)
printf "Test: \e[33m create_module con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_module "M02043" "Applicazioni distribuite" 1 6 $rightToken)
printf "Test: \e[33m create_module con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#ADD COURSE TO MODULE
response=$(add_course_to_module "C08003" "M08002" $wrongToken)
printf "Test: \e[33m add_course_to_module con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(add_course_to_module "C08003" "M08002" $rightToken)
printf "Test: \e[33m add_course_to_module con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#CREATE DEPARTMENT
response=$(create_department "DTI" $wrongToken)
printf "Test: \e[33m create_department con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_department "DTI" $rightToken)
printf "Test: \e[33m create_department con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#CREATE STUDY PLAN
response=$(create_studyPlan "Ingegneria informatica TP" "DTI" $wrongToken)
printf "Test: \e[33m create_studyPlan con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_studyPlan "Ingegneria informatica TP" "DTI" $rightToken)
printf "Test: \e[33m create_studyPlan con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#ADD MODULE TO STUDY PLAN
response=$(add_module_to_studyPlan "M02043" "Ingegneria informatica TP" $wrongToken)
printf "Test: \e[33m add_module_to_studyPlan con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(add_module_to_studyPlan "M02043" "Ingegneria informatica TP" $rightToken)
printf "Test: \e[33m add_module_to_studyPlan con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#CREATE STUDENT MODULE
response=$(create_studentModule "SM03806" "M02043" $wrongToken)
printf "Test: \e[33m create_studentModule con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_studentModule "SM03806" "M02043" $rightToken)
printf "Test: \e[33m create_studentModule con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#CREATE SEMESTER
response=$(create_semester "Semestre Primaverile 2019 - Informatica TP" "Semestre primaverile 2019 per gli studenti di ingegneria informatica a tempo pieno del terzo anno." $wrongToken)
printf "Test: \e[33m create_semester con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_semester "Semestre Primaverile 2019 - Informatica TP" "Semestre primaverile 2019 per gli studenti di ingegneria informatica a tempo pieno del terzo anno." $rightToken)
printf "Test: \e[33m create_semester con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#ADD STUDENT TO SEMESTER
response=$(add_studentModule_to_semester "SM03806" "Semestre Primaverile 2019 - Informatica TP" $wrongToken)
printf "Test: \e[33m add_studentModule_to_semester con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(add_studentModule_to_semester "SM03806" "Semestre Primaverile 2019 - Informatica TP" $rightToken)
printf "Test: \e[33m add_studentModule_to_semester con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#CREATE STUDENT
response=$(create_student "S83934" "Zyril Errol" "Gatchalian" "16-682-080" $wrongToken)
printf "Test: \e[33m create_student con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(create_student "S83934" "Zyril Errol" "Gatchalian" "16-682-080" $rightToken)
printf "Test: \e[33m create_student con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
	
#SUBCRIBE STUDENT TO SEMESTER
response=$(subscribe_student_to_semester "S83934" "Semestre Primaverile 2019 - Informatica TP" $wrongToken)
printf "Test: \e[33m subscribe_student_to_semester con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(subscribe_student_to_semester "S83934" "Semestre Primaverile 2019 - Informatica TP" $rightToken)
printf "Test: \e[33m subscribe_student_to_semester con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi
#GET USERS
response=$(get_users $wrongToken)
printf "Test: \e[33m get_users con token sbagliato \e[39m=>  "
	if [ "$response" == '0' ] 
		then TRUE
		else FALSE
	fi
response=$(get_users $rightToken)
printf "Test: \e[33m get_users con token giusto \e[39m=>  "
	if [ "$response" != '0' ] 
		then TRUE
		else FALSE
	fi

